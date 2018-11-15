package io.javademo.examples.minimalistic;

import javax.validation.constraints.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by marcomolteni on 20.04.17.
 */
@XmlRootElement(name = "Person")
public class Person {
        private static final String DEFAULT_MESSAGE = "Example of message from the server for: %s";

        @NotEmpty @Size(min = 3, max = 20)
        private String name;

        @NotNull @Min(14) @Max(150)
        private Integer age;

        private String message;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
            this.message = String.format(DEFAULT_MESSAGE, name);
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
          this.message = message;
        }
}
