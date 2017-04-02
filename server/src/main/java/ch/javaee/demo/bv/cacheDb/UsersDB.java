package ch.javaee.demo.bv.cacheDb;


import ch.javaee.demo.bv.User;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.ArrayList;
import java.util.List;

@Startup
@Singleton
public class UsersDB {

    private List<User> userList = new ArrayList<>();

    public UsersDB() {
        User user = new User("Teddy", "Teddy", 1990);
        userList.add(user);
    }

    public User addUser(User user){
        userList.add(user);

        return user;
    }

    public List<User> getUserList() {
        return userList;
    }
}
