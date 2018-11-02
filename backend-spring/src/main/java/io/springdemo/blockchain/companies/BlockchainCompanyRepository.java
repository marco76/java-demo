package io.springdemo.blockchain.companies;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface BlockchainCompanyRepository extends JpaRepository<BlockchainCompany, BigInteger> {
}
