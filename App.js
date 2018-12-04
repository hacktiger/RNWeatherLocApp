/* eslint-disable camelcase */
'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
/* eslint-disable no-unused-vars */
const react_1 = __importDefault(require('react'))
const react_native_1 = require('react-native')
//
const Spinner_1 = __importDefault(require('./src/presentation/common/Spinner'))
//
const Navigation_1 = require('./src/presentation/common/Navigation')
const Firebase_1 = __importDefault(require('./src/controller/Firebase'))
class AppScreen extends react_1.default.Component {
  constructor (props) {
    super(props)
    // eslint-disable-next-line new-cap
    this.myFirebase = new Firebase_1.default()
  }
  componentDidMount () {
    this.myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Navigation_1.goToApp()
      } else {
        Navigation_1.goToLogIn()
      }
    })
  }
  render () {
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
      react_1.default.createElement(Spinner_1.default, { size: 'large' }),
      react_1.default.createElement(react_native_1.Text, null, ' Checking authentication ... ')))
  }
}
exports.default = AppScreen
// Styles
const styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
