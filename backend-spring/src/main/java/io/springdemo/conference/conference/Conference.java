package io.springdemo.conference.conference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

/**
 * Created by marcomolteni on 23.04.17.
 */
@Entity
@Table(name = "CONFERENCE")
public class Conference {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter private Long id;

    @NotEmpty
    @Getter @Setter private String name;

    @Getter @Setter private String website;

    @Getter @Setter private String languages;

    @JsonSerialize(using = LocalDateSerializer.class)
    @Getter @Setter private LocalDate begin;

    @JsonSerialize(using = LocalDateSerializer.class)
    @Getter @Setter private LocalDate end;

    @JsonSerialize(using = LocalDateSerializer.class)
    @Getter @Setter private LocalDate cfp;

    @Getter @Setter private String city;

    @Getter @Setter private String country;

    @Column(name = "iso_country")
    @Getter @Setter private String isoCountry;
}
