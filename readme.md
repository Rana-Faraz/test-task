# Readme to Setup the app

This app was made in React Native using Expo-cli

## Installation

- Use the package manager yarn run this command to install yarn

```bash
npm i yarn
```

- Next install the Node_Modules using

```bash
yarn install
```

- Install the latest version of Expo Go on your phone [IOS](https://apps.apple.com/us/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1)
- To run the development server run

```bash
npx expo start --tunnel
```

- Finally scan the QR code in your Expo Go app from your phone.
- If you wish to use react-native-cli you can eject project to native code

```bash
npx expo eject
```

## Details

For Authentication **Firebase Authentication** was used. For global state management **Redux** is being used and as a middleware **Redux-Thunk**.
To retain the login state the logged in users **UID** is being stored to device using **AsyncStorage**.
Data is Being stored in **Firestore**.
