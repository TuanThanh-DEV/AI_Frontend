import 'package:get_storage/get_storage.dart';

final box = GetStorage();

// ignore: camel_case_types
class localStorageMiddleware {

  void setItem (String key, dynamic value) {
    box.write(key, value);
  }

  dynamic getItem (String key){
    String? value = box.read(key);
    return (value == null)?"":value;
  }

  void removeItem (String key){
    box.remove(key);
  }

  void clearStorage(){
    dynamic urlBackendStorage = box.read("urlBackend");
    dynamic expiresIn = box.read("expires_in");
    box.erase();
    box.write("urlBackend", urlBackendStorage);
    box.write("expires_in", expiresIn);
  }

}