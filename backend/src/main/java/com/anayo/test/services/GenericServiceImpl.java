package com.anayo.test.services;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anayo.test.daos.GenericDao;
import com.anayo.test.entitys.AbstractEntity;

@Service(value="genericService")
public class GenericServiceImpl implements GenericService {
	
	@Autowired(required = false)
	GenericDao<AbstractEntity, String> genericDao;

	@Override
	public AbstractEntity save(AbstractEntity entity) {
		AbstractEntity saveAbstractEntity = entity;
		try {
			if(entity.getId() == null) {
				saveAbstractEntity = this.genericDao.persist(entity);
			}else {
				saveAbstractEntity = this.genericDao.merge(entity);
			}
			saveAbstractEntity.setError("success");
			
		} catch (Exception e) {
			e.printStackTrace();
			saveAbstractEntity.setError("Error");
		}
		
		return  saveAbstractEntity;
	}

	@Override
	public void delete(Class cl, Long id) {
		this.genericDao.delete(cl, id);
	}

	@Override
	public void delete(AbstractEntity entity) {
		this.genericDao.delete(entity);
	}

	@Override
	public AbstractEntity find(Class cl, Long id) {
		return (AbstractEntity) this.genericDao.find(cl, id);
	}

	@Override
	public Session getconnection() {
		return this.genericDao.getConnection();
	}

	@Override
	public List<AbstractEntity> getAll(Class cl) {
		return this.genericDao.getAll(cl);
	}
	
	@Override
	public List<AbstractEntity> findByCol(Class cl, String col, String value) {
		return this.genericDao.findByCol(cl, col, value);
	}

}
