defmodule RedixDemo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do

    [_, password, host, port] = Regex.run(
      ~r{(.+):(.+)@(.+):(\d+)},
      System.get_env("REDIS_URL"),
      capture: :all_but_first
    )
    port = elem(Integer.parse(port), 0)

    children = [
      RedixDemoWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:redix_demo, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: RedixDemo.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: RedixDemo.Finch},
      # Start a worker by calling: RedixDemo.Worker.start_link(arg)
      # {RedixDemo.Worker, arg},
      # Start to serve requests, typically the last entry
      RedixDemoWeb.Endpoint,
      {
        Redix,
        name: :redix,
        host: host,
        port: port,
        password: password,
        # socket_opts: [:inet6]
      }
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RedixDemo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RedixDemoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
