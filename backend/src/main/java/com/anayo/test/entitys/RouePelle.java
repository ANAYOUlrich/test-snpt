package com.anayo.test.entitys;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="ROUE_PELLES")
public class RouePelle  extends AbstractEntity{
	
	private String numero;
	
	private String numPlaque;
	
	private Date dateFab;

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getNumPlaque() {
		return numPlaque;
	}

	public void setNumPlaque(String numPlaque) {
		this.numPlaque = numPlaque;
	}

	public Date getDateFab() {
		return dateFab;
	}

	public void setDateFab(Date dateFab) {
		this.dateFab = dateFab;
	}
	
//	@OneToMany(mappedBy = "rouePelle")
//	private List<Composant> composants;
	
	
}
