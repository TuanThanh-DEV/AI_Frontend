import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/first_screen_page.dart';
import 'package:get_storage/get_storage.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
      options: const FirebaseOptions(
          apiKey: 'AIzaSyDa2jBRFYiZirXtwt1xStmtvkOuIgmNQMo',
          appId: '1:53384833158:android:f02bb0aa5f4bf3598c4907',
          messagingSenderId: '53384833158',
          projectId: 'timect-project'));
  await GetStorage.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: firstScreenPage(),
    );
  }
}
