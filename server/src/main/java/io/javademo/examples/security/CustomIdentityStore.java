package io.javademo.examples.security;

import javax.enterprise.context.ApplicationScoped;
import javax.security.enterprise.credential.Credential;
import javax.security.enterprise.credential.UsernamePasswordCredential;
import javax.security.enterprise.identitystore.CredentialValidationResult;
import javax.security.enterprise.identitystore.IdentityStore;

import java.util.HashSet;

import static java.util.Arrays.asList;
import static javax.security.enterprise.identitystore.CredentialValidationResult.INVALID_RESULT;

/**
 * Created by marcomolteni on 04.06.17.
 */
@ApplicationScoped
public class CustomIdentityStore implements IdentityStore {

    @Override
    public CredentialValidationResult validate(Credential credential) {

        UsernamePasswordCredential usernamePasswordCredential = (UsernamePasswordCredential) credential;

        // if the password is 'secret' the validation succeed!
        if (usernamePasswordCredential.getPassword().compareTo("secret")) {

            // we assign the user to the group 'user' and return the validation result
            return new CredentialValidationResult(usernamePasswordCredential.getCaller(),
                    new HashSet<>(asList("user")));
        }

        return INVALID_RESULT;
    }
}