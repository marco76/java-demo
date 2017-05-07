package io.javademo.examples.bv.time;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.time.Year;

/**
 * Created by marcomolteni on 07.05.17.
 */
public class YearDeserializer extends StdDeserializer<Year> {


    public YearDeserializer() {
        this(null);
    }

    public YearDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Year deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        return Year.parse(jsonParser.readValueAs(String.class));
    }
}
