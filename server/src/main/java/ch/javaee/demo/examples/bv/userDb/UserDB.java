package ch.javaee.demo.examples.bv.userDb;


import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.ArrayList;
import java.util.List;

@Startup
@Singleton
public class UserDB {

    private List<User> userList = new ArrayList<>();

    public UserDB() {
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
