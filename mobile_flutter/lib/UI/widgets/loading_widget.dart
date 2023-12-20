import 'package:flutter/material.dart';

class LoadingDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: Colors.transparent,
      elevation: 0,
      content: SingleChildScrollView(
        child: ListBody(
          children: <Widget>[
            Container(
              margin: const EdgeInsets.only(top: 50),
              child: Image.asset(
                'images/loading.gif',
                cacheHeight: 500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
