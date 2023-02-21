package com.characterBuilder.service;

import com.characterBuilder.entity.User;
import com.characterBuilder.payload.UserDto;

public interface UserService {

    // Take info from the registration form, encode password, save user in database
    User signUpUser(UserDto userDto);
}
