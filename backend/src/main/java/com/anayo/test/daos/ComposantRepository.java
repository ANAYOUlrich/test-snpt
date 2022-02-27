package com.anayo.test.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anayo.test.entitys.Composant;
import com.anayo.test.entitys.RouePelle;

@Repository
public interface ComposantRepository extends JpaRepository<Composant, Long>{
	
	List<Composant> findByRouePelle(RouePelle rouePelle); 
}

