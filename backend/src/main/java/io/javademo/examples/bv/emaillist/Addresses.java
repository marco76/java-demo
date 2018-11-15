package io.javademo.examples.bv.emaillist;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by marco on 05.04.17.
 */
public class Addresses {

    /**
     * The list can have at maximum 2 string.
     * The strings should have an email format
     */

    @Size(max = 2)
    private List<@Email @NotNull String> emailList = new ArrayList<>();

    public void addEmail(String email) {
        emailList.add(email);
    }

    public List<String> getEmailList() {
        return emailList;
    }

    public void setEmailList(List<String> emailList) {
        this.emailList = emailList;
    }
}
