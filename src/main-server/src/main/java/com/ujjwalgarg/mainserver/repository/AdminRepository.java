package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.user.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
