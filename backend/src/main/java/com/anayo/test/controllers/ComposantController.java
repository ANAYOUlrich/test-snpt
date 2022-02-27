package com.anayo.test.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anayo.test.daos.ComposantRepository;
import com.anayo.test.daos.RouePelleRepository;
import com.anayo.test.entitys.AbstractEntity;
import com.anayo.test.entitys.Composant;
import com.anayo.test.entitys.RouePelle;
import com.anayo.test.services.GenericService;

@RestController
@CrossOrigin()
@RequestMapping("/api/composant")
public class ComposantController {
	@Autowired
	private ComposantRepository composantRepository;
	
	@Autowired
	private RouePelleRepository rouePelleRepository;
	
	@GetMapping("/all")
	public List<Composant> getAllComposant() {
		return composantRepository.findAll();
	}
	
	@PostMapping(value = "/store", headers = "Accept=application/json" )
	public Composant storeComposant(@RequestBody Composant composant) {
		
		Composant saveComposant = null;
		try {
			saveComposant= composantRepository.save(composant);		
			saveComposant.setError("success");
		} catch (Exception e) {
			saveComposant = new Composant();
			saveComposant.setError("error");
		}
		return saveComposant;
	}
	
	@GetMapping("/roue-pelle/{idRoupelle}")
	public List<Composant> getComposantOfRouePelle(@PathVariable Long idRoupelle) {
		RouePelle rouePelle = rouePelleRepository.findById(idRoupelle).get();
		List<Composant> composants = composantRepository.findByRouePelle(rouePelle);
		
		return composants;
	}
	
	@DeleteMapping(value="delete/{id}")
	public Boolean deleteComposant(@PathVariable Long id) {
		Boolean resp = false;
		try {
			this.composantRepository.deleteById(id);
			resp = true;
		} catch (Exception e) {
			e.printStackTrace();
			resp = false;
		}
		return resp ;
	}
	
}
