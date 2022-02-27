package com.anayo.test.daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GenericDaoImpl<E, K> implements GenericDao<E, K> {
	@Autowired
	private EntityManager entityManager;

	@Override
	public E persist(E entity) {
		entityManager.persist(entity);
		return entity;
	}

	@Override
	public E merge(E entity) {
		entityManager.merge(entity);
		return null;
	}

	@Transactional
	public void delete(E entity) {
		if(entity != null)
		entityManager.remove(entity);
	}

	@Transactional
	public void delete(Class cl, Long id) {
		this.delete(this.find(cl, id));
	}

	@Override
	public E find(Class cl, Long id) {
		return (E)entityManager.find(cl, id);
	}

	@Override
	public Session getConnection() {
		return entityManager.unwrap(Session.class);
	}

	@Override
	public List<E> getAll(Class cl) {
		CriteriaQuery<E> criteria = entityManager.getCriteriaBuilder().createQuery(cl);
		criteria.select(criteria.from(cl));
		List<E> resultList = entityManager.createQuery(criteria).getResultList();
		return resultList;
	}
	
	@Override
	public List<E> findByCol(Class cl, String col, String value) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Object> cq = cb.createQuery(cl);
		Root<Object> from = cq.from(cl);
		cq.select(from).where(cb.equal(from.get(col), value));
		Query query = entityManager.createQuery(cq);
		List<E> list = query.getResultList(); 
		return list;
	}
}
