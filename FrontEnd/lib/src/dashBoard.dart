import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_login_signup/src/welcomePage.dart';
import 'dart:async';
import 'package:http/http.dart' as http;



class DashBoard extends StatefulWidget {
  DashBoard({Key key, this.profile}) : super(key: key);
  final String profile;
  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  bool _isLoading;

  logOut() async {
    var jsonResponse = null;
    var response = await http.get(
      logoutURL,
    );

    if (response.statusCode == 200) {
      jsonResponse = json.decode(response.body);
      if (jsonResponse != null) {
        setState(() {
          _isLoading = false;
        });
        print(response.body);
        print(jsonResponse);
        print('Out!');
      }
    } else {
      setState(() {
        _isLoading = false;
      });
      print(response.body);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
              child: Center(
        child: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  RaisedButton(
                    onPressed: () {
                      logOut();
                      Navigator.pop(context);
                    },
                    child: Text('LogOut'),
                  ),
                  Text(widget.profile),
                ],
              ),
            ],
          ),
        ),
      ))),
    );
  }
}
