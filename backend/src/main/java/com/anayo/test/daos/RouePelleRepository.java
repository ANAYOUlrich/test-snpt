package com.anayo.test.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anayo.test.entitys.RouePelle;

@Repository
public interface RouePelleRepository extends JpaRepository<RouePelle, Long>{

}
