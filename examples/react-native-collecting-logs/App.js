import React from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView,
  ImageBackground,
  View,
  Dimensions,
  TouchableHighlight,
  Text,
  Alert,
  TextInput,
  StatusBar,
  Button,
  Platform,
  NativeModules,
  TouchableOpacity,
  Image,} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
  useSafeAreaFrame} from 'react-native-safe-area-context';
import { NavigationContainer, navigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {navigationRef} from './RootNavigation';
import { Kafka } from "@upstash/kafka";

var kafka = null;
var p = null;
class Appp extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    kafka = new Kafka({
      url: "UPSTASH-KAFKA-REST-URL",
      username: "UPSTASH-KAFKA-PRODUCEONLY-USERNAME",
      password: "UPSTASH-KAFKA-PRODUCEONLY-PASSWORD",
    });
    p = kafka.producer();
  }

  async costQuery(code){
    console.log("CODE OF QUERIED PRODUCT: ", code);
    await fetch('https://us1-maximum-boar-36431.upstash.io/get/' + code, {
        headers: {
          Authorization: "Bearer Ao5PACQgMTg1YmQxNzItMzM3My00OTE0LWE3ZDQtMWQ1NmY2NjY5OTBk93BHVkmHB8LViUm4YLBFHQG2sHKJ3OX6xqfz2zyYEqQ="
        }
      })
      .then(response => response.json())
      .then(async (data) => {
        var result = data["result"];
        console.log(typeof data["result"])
        if(result == null){
          throw new Error("Price of the " + code + " could not found.")
        }
        else{
          const res = await p.produce("users.purchase", "Cost of " + code + " is retreived successfully.");
          console.log(res);
          Alert.alert("The price of the product is " + result);
        }
      })
      .catch(async (err) => {
        const res = await p.produce("users.error", err.message);
        console.log(res);
      });
  }

  render(){
    this.height = Math.round(Dimensions.get('screen').height);
    this.width = Math.round(Dimensions.get('screen').width);
    return (
      <SafeAreaView style={{
        width: this.width,
        height: this.height,
        flex: 1,
        flexDirection:'column',
        alignItems: 'center'}}>
        <StatusBar
        backgroundColor="#f4511e"/>

        <View style={{height: this.height/11}} />

        <View
        style={{flex:1, flexDirection: 'row', width: this.width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
        <TouchableOpacity
        style={{padding: 10, flex:1, width: this.width/2, height: "100%", alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>{this.costQuery("1234")}}>
        <Image style={{width:"100%", height: "100%"}}
        source={require('./images/1.png')} />
        </TouchableOpacity>
        <TouchableOpacity
        style={{padding: 10, flex:1, width: this.width/2, height: "100%", alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>{this.costQuery("1235")}}>
        <Image style={{width:"100%", height: "100%"}}
         source={require('./images/2.png')} />
        </TouchableOpacity>
        </View>

        <View
        style={{flex:1, flexDirection: 'row', width: this.width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
        <TouchableOpacity
        style={{padding: 10, flex:1, width: this.width/2, height: "100%", alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>{this.costQuery("1236")}}>
        <Image style={{width:"100%", height: "100%"}}
         source={require('./images/3.png')} />
        </TouchableOpacity>
        <TouchableOpacity
        style={{padding: 10, flex:1, width: this.width/2, height: "100%", alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>{this.costQuery("1237")}}>
        <Image style={{width:"100%", height: "100%"}}
         source={require('./images/4.png')} />
        </TouchableOpacity>
        </View>

        <View style={{height: this.height/11}} />

      </SafeAreaView>
    );
  };
};

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const config2 = {
  animation: 'spring',
  config: {
    duration: 1000,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function App({navigation}) {
  return (
        <NavigationContainer  ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                gestureEnabled: false,
                title: "How much is it?",
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                transitionSpec: {
                  open: config2,
                  close: config2,
                },
              }}
              name="Appp"
              component={Appp}
            />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
