package io.springdemo.controller.blockchain;

import io.springdemo.blockchain.companies.BlockchainCompany;
import io.springdemo.blockchain.companies.BlockchainCompanyRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class BlockchainCompanyController {

    BlockchainCompanyRepository blockchainCompanyRepository;

    public BlockchainCompanyController(BlockchainCompanyRepository blockchainCompanyRepository) {
        this.blockchainCompanyRepository = blockchainCompanyRepository;
    }

    @GetMapping("/rest/blockchain/company/list")
    public List<BlockchainCompany> getBlockchainCompaniesList(){
        return blockchainCompanyRepository.findAll();
    }

}
