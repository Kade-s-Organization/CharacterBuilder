package com.characterBuilder.service;

import com.characterBuilder.entity.User;
import com.characterBuilder.payload.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
    UserDetails loadUserByUsername(String username);
    // Take info from the registration form, encode password, save user in database
    User signUpUser(UserDto userDto);
}
