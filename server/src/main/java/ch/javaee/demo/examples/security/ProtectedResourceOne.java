package ch.javaee.demo.examples.security;

/**
 * TODO: error with soteria and WELD. The bug is open in the soteria project.
 */

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

//@javax.ws.rs.Path("security/protected")
public class ProtectedResourceOne {
/**
    @Inject
    private javax.security.SecurityContext securityContext;

    @GET
    @Path("sayHi")
    public String sayHi() {
        return "saying hi!";
    }

    @GET
    @Path("callerName")
    public String getCallerName() {
        if (securityContext.getCallerPrincipal() != null) {
            return securityContext.getCallerPrincipal().getName();
        }

        return null;
    }

    @GET
    @Path("hasRoleFoo")
    public boolean hasRoleFoo() {
        return securityContext.isCallerInRole("foo");
    }

    @GET
    @Path("hasRoleKaz")
    public boolean hasRoleKaz() {
        return securityContext.isCallerInRole("kaz");
    }
    */
}
