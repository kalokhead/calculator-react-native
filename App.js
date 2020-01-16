import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, state } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import MaskedView from '@react-native-community/masked-view';
import { TextInput } from 'react-native-gesture-handler';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resultText: "", //initialize the resultText empty
      calculationtext: "",//initialize the calulationText empty
     hdata:"" 
    }
    this.operations = ["DEL", "+", "-", "*", "/"]  //set of operations
  }

  componentDidMount() {
    const hdata = this.props.navigation.getParam('hdata');
    console.log("**** :" + hdata)
    this.setState({
      calculationtext: hdata
    });
  }

  validate() {
    const text = this.state.resultText
    switch (text.split(-1)) { //validation for the text end with operations
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true  //validation for the text not end with operations
  }

  calulateResult() {
    const text = this.state.resultText //calculation of the calulator

    this.setState({
      calculationtext: eval(text)
    })
  }

  buttonPressed(text) {
    const lastChar = this.state.resultText.split('').pop()
    if (text == "=") {
      if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
        return;
      }
      return this.validate() && this.calulateResult() // checking the condition of validation and calculation result


    }


    this.setState({
      resultText: this.state.resultText + text // for the taking input number
    })

  }

  operate(operations) {
    switch (operations) {
      case 'DEL':
        let text = this.state.resultText.split('') //for the del operation
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break

      case '+':
      case "-":
      case "*":      //for the input operation
      case "/":
        const lastChar = this.state.resultText.split('').pop()
        if (this.operations.indexOf(lastChar) > 0) {
          return //for not getting operation repetly
        }
        if (this.state.resultText == "") {
          return //for the not taking symbol when null
        }
        this.setState({
          resultText: this.state.resultText + operations //for seting the number and  operations
        })
    }
  }
  render() {
    let rows = []
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]]
    for (let i = 0; i < 4; i++) {
      let row = []                      //input  number button 
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }


    let ops = []
    for (let i = 0; i < 5; i++) {  //input  operation button 
      ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(this.operations[i])}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }




    return (
      <View style={styles.container}>

        <View style={styles.calculation}>
          <Text style={styles.calculationtext}>{this.state.resultText}</Text>
        </View>



        <View style={styles.result}>
          <Text style={styles.resultText} onPress={() => this.props.navigation.navigate('Detail', { data: this.state.calculationtext })}>{this.state.calculationtext}</Text>
        </View>



        <View style={styles.button}>
          <View style={styles.number}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>



        </View>



      </View>
    )
  }
}



class DetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
    }

  }


  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    this.setState({
      data: data,
      newData: ""
    });
  }

  render() {

    return (
      <View>
        <TextInput
          onChangeText={hdata => this.setState({ newData: hdata })}>{this.state.data}</TextInput>
      
        <Button title="go back" onPress={() => this.props.navigation.navigate('Home', { hdata: this.state.newData })} />
       
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: DetailScreen
  },
  { initialRouteName: 'Home' }

);


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculation: {
    flex: 3,
    backgroundColor: 'green',
    justifyContent: "center",
    alignItems: "flex-end"
  },
  result: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    flex: 6,
    flexDirection: 'row',

  },
  number: {
    flex: 3,
    backgroundColor: "blue"
  },
  operations: {
    flex: 1,
    backgroundColor: '#9FA8DA',
    justifyContent: 'space-around',
    alignItems: 'stretch'

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  calculationtext: {
    fontSize: 40,

  },
  resultText: {
    fontSize: 30,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30,

  }
})

