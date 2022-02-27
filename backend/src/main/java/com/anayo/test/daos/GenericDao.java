package com.anayo.test.daos;

import java.util.List;

import org.hibernate.Session;

public interface GenericDao <E, K> {
	public E persist(E entity);
	public E merge(E entity);
	public void delete(E entity);
	public void delete(Class cl, Long id);
	public E find(Class cl, Long id);
	public List<E> findByCol(Class cl, String col, String value);
	public List<E> getAll(Class cl);
	public Session getConnection();
}