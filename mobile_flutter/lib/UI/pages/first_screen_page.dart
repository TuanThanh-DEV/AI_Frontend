import 'dart:async';

import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/method_login_page.dart';
import 'package:timecprj/service/agent.dart';

class firstScreenPage extends StatelessWidget {
  const firstScreenPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
      routes: {
        '/home': (context) => const methodLoginPage(),
      },
    );
  }
}

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    if(localStorage.getItem("urlBackend") == ""){
      localStorage.setItem("urlBackend", "http://103.90.235.12:8090/api");
    }
    Timer(const Duration(seconds: 4), () {
      Navigator.pushNamed(context, '/home');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Image.asset('images/logo-timec.png'),
      ),
    );
  }
}
