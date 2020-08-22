package com.ecm.controller;

import com.ecm.model.User;
import com.ecm.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import net.sf.json.JSONObject;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
public class LoginController {

    @Autowired
    private UserManageService userService;

    @RequestMapping(value="/checkLogin")
    public JSONObject checkLogin(@RequestBody JSONObject userObject){
//        String password_true = userService.getPassword(username);
        String name = userObject.getString("username");
        String password = userObject.getString("password");
        User user = userService.getUserByName(name);

        JSONObject result  = new JSONObject();
        if(user==null)
            result.put("realName", "null");
        else if(password.equals(user.getPassword()))
            result.put("realName", user.getRealName());
        else
            result.put("realName", "error");
        return result;
    }
}
