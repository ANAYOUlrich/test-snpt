package com.anayo.test.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anayo.test.daos.ComposantRepository;
import com.anayo.test.daos.RouePelleRepository;
import com.anayo.test.entitys.Composant;
import com.anayo.test.entitys.RouePelle;

@RestController
@CrossOrigin()
@RequestMapping("/api/roue-pelle")
public class RouePelleController {

	@Autowired
	private RouePelleRepository rouePelleRepository;
	
	@Autowired
	private ComposantRepository composantRepository;
	
	
	@GetMapping("/all")
	public List<RouePelle> getAllRouePelle() {
		return rouePelleRepository.findAll();
	}
	
	@PostMapping(value = "/store", headers = "Accept=application/json" )
	public RouePelle storeRouePelle(@RequestBody RouePelle rouePelle) {
		
		RouePelle saveRouePelle = null;
		try {
			saveRouePelle= rouePelleRepository.save(rouePelle);		
			saveRouePelle.setError("success");
		} catch (Exception e) {
			saveRouePelle = new RouePelle();
			saveRouePelle.setError("error");
		}
		return saveRouePelle;
	}	
	
	@PutMapping(value = "/update/{id}",  headers ="Accept=application/json")
	public RouePelle updateEmployee(@PathVariable(value = "id") Long id, @RequestBody RouePelle rouePelle) {
		
		RouePelle updateRouePelle = null;
		try {
			RouePelle rouePelleDetails = rouePelleRepository.findById(id).get();
			rouePelleDetails.setDateFab(rouePelle.getDateFab());
			rouePelleDetails.setNumero(rouePelle.getNumero());
			rouePelleDetails.setNumPlaque(rouePelle.getNumPlaque());
			
			updateRouePelle = rouePelleRepository.save(rouePelleDetails);
			updateRouePelle.setError("success");
			
		} catch (Exception e) {
			updateRouePelle = new RouePelle();
			updateRouePelle.setError("error");
		}
		return updateRouePelle;
	}
	
	@DeleteMapping(value="delete/{id}")
	public Boolean deleteRouePelle(@PathVariable Long id) {
		Boolean resp = false;
		try {
			RouePelle rouePelle = rouePelleRepository.findById(id).get();
 			List<Composant> composants = composantRepository.findByRouePelle(rouePelle);
			
			if(composants.size()> 0) {
				for (Composant composant : composants) {
					composantRepository.delete(composant);
				}
			}
			this.rouePelleRepository.deleteById(id);
			resp = true;
		} catch (Exception e) {
			e.printStackTrace();
			resp = false;
		}
		return resp ;
	}
	
	
	
}
