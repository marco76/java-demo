package io.springdemo.blockchain.companies;

import lombok.Data;

import javax.persistence.*;
import java.math.BigInteger;

@Data
@Entity (name = "blockchain_company")
public class BlockchainCompany {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "city")
    private String city;
}
