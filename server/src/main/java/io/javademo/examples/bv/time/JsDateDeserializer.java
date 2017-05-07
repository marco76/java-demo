package io.javademo.examples.bv.time;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 07.05.17.
 */
public class JsDateDeserializer extends StdDeserializer<LocalDate> {

    private static Logger LOGGER = Logger.getLogger(JsDateDeserializer.class.getName());

    public JsDateDeserializer() {
        this(null);
    }

    public JsDateDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public LocalDate deserialize(JsonParser jsonParser, DeserializationContext ctxt) {
        try {
            String dateAsString = jsonParser.getValueAsString();
            if (dateAsString == null) {
                return null;
            }

            LOGGER.info(String.format("Converting : %s", dateAsString));

            String[] date = dateAsString.split("-");

            return LocalDate.of(Integer.parseInt(date[0]), Integer.parseInt(date[1]), Integer.parseInt(date[2]));

        } catch (Exception e) {
            LOGGER.severe("Impossible to convert the  string");
            return null;
        }
    }
}
