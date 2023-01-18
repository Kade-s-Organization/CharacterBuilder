package com.kade.mcps.user;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
public class User implements UserDetails {
    @Id
    @Column(name = "user_id", updatable = false)
    // There are three types of generated value strategies. Identity, sequence, and auto. Auto and sequence create a table named hibernate_sequences that maintains the sequence. Identity doesn't create an additional table and the sequence begins at 0 in every table. Sequence is custimizable. Auto will create a squence that is shared among table, so if one table uses 1, the other table will start at 2 if both have a primary key configured with GenerationType.AUTO. So Auto makes one table, sequence makes n tables, identity makes no tables.
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    @Column(name = "username", nullable = true, columnDefinition = "TEXT")
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private boolean active;

    //    User details implementation. https://www.codejava.net/frameworks/spring-boot/spring-boot-security-authentication-with-jpa-hibernate-and-mysql implements in a separate class but it can just be accomplished in the

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(userRole.name());
        // singletonList is like an array list but immutible https://www.baeldung.com/java-aslist-vs-singletonlist
        return Collections.singletonList(authority);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
