package com.anayo.test.services;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.anayo.test.entitys.AbstractEntity;

@Service(value="genericService")
public interface GenericService {
	public AbstractEntity save(AbstractEntity base);
	public void delete(Class cl, Long id);
	public void delete(AbstractEntity entity);
	public AbstractEntity find(Class cl, Long id);
	public List<AbstractEntity> getAll(Class cl);
	public List<AbstractEntity> findByCol(Class cl, String col, String value);
	public Session getconnection();
}
