package com.anayo.test.entitys;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="COMPOSANTS")
public class Composant  extends AbstractEntity {
	
	private String numCom;
	
	private Long qte;
	
	@ManyToOne
	@JoinColumn(name="rouePelleId")
	private RouePelle rouePelle ;

	public String getNumCom() {
		return numCom;
	}

	public void setNumCom(String numCom) {
		this.numCom = numCom;
	}

	public Long getQte() {
		return qte;
	}

	public void setQte(Long qte) {
		this.qte = qte;
	}

	public RouePelle getRouePelle() {
		return rouePelle;
	}

	public void setRouePelle(RouePelle rouePelle) {
		this.rouePelle = rouePelle;
	}
	
	
}