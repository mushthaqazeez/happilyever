create database turtoise;
create table profiles(
    name varchar(100) not null,
    DOB date not null,
    status varchar(100) default 'ACTIVE'
);
