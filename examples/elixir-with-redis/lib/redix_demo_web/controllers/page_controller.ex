defmodule RedixDemoWeb.PageController do
  use RedixDemoWeb, :controller

  defmodule Payload do
    defstruct text: nil, weather: nil, location: nil
  end

  def status(conn, _params) do
    case Redix.command(:redix, ["PING"]) do
      {:ok, response} ->
        render_home(conn, %Payload{text: "Redis Connection Status: Success! Response to 'PING': '#{response}'"})
      {:error, response} ->
        render_home(conn, %Payload{text: "Redis Connection Status: Error. Reason: #{response.reason}"})
      end
  end

  def home(conn, %{"text" => text}) do
    case fetch_weather(text) do
      {:ok, %{"location" => location, "temp" => temp_c, "condition" => condition_text}} ->
        render_home(conn, %Payload{weather: "#{condition_text}, #{temp_c}", location: location})
      {:error, reason} ->
        render_home(conn, %Payload{text: reason})
    end
  end

  def home(conn, _params) do
    render_home(conn, %Payload{text: "Enter a location above to get the weather info!"})
  end

  defp render_home(conn, %Payload{} = payload) do
    render(conn, "home.html", text: payload.text, weather: payload.weather, location: payload.location)
  end

  defp fetch_weather(location) do
    location = String.replace(location, " ", "%20")
    case fetch_weather_from_cache(location) do
      {:ok, cached_weather} ->
        {:ok, cached_weather}
      {:error, :not_found} ->
        fetch_weather_from_api(location)
      {:error, reason} ->
        {:error, reason}
    end
  end

  # Function to fetch weather from Redis cache
  defp fetch_weather_from_cache(location) do
    case Redix.command(:redix, ["GET", "weather:#{location}"]) do
      {:ok, nil} ->
        {:error, :not_found}
      {:ok, cached_weather_json} ->
        {:ok, Jason.decode!(cached_weather_json)}
      {:error, _reason} ->
        {:error, "Failed to fetch weather data from cache."}
    end
  end

  # Function to fetch weather from the API
  defp fetch_weather_from_api(location) do
    weather_api_key = System.get_env("WEATHER_API_KEY")
    url = "http://api.weatherapi.com/v1/current.json?key=#{weather_api_key}&q=#{location}&aqi=no"

    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        weather_info = body
                      |> Jason.decode!()
                      |> get_weather_info()

        # Cache the weather response in Redis for 8 hours
        cache_weather_response(location, Jason.encode!(weather_info))

        {:ok, weather_info}
      {:ok, %{status_code: status_code, body: body}} ->
        {:error, "#{body} (#{status_code})"}
      {:error, _reason} ->
        {:error, "Failed to fetch weather data."}
    end
  end

  # Function to cache weather response in Redis
  defp cache_weather_response(location, weather_data) do
    case Redix.command(:redix, ["SET", "weather:#{location}", weather_data, "EX", 8 * 60 * 60]) do
      {:ok, _} ->
        :ok
      {:error, _reason} ->
        {:error, "Failed to cache weather data."}
    end
  end

  defp get_weather_info(%{
    "location" => %{
      "name" => name,
      "region" => region
    },
    "current" => %{
      "temp_c" => temp_c,
      "condition" => %{
        "text" => condition_text
      }
    }
  }) do
    %{"location" => "#{name}, #{region}", "temp" => temp_c, "condition" => condition_text}
  end
end
