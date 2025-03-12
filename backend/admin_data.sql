--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

INSERT INTO public.admin_users (id, document_id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) 
VALUES (1, 'l20xp7zzaey0yvn0zpjfo6zs', 'Admin', 'Adminovich', NULL, 'admin@plakordivisiones.es', '$2a$10$FyXX5WL7ybE4fA8Iu41ChecMD3YpXn2Is06GouLJOJqm6wfvzM91C', NULL, NULL, true, false, NULL, '2025-02-22 15:11:46.948', '2025-02-22 15:11:46.948', '2025-02-22 15:11:46.95', NULL, NULL, NULL);

INSERT INTO public.admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES 
(1, 'swnwt29tw0saxyq2rso04nhz', 'Super Admin', 'strapi-super-admin', 'Super Admins can access and manage all features and settings.', '2025-02-22 13:06:39.549', '2025-02-22 13:06:39.549', '2025-02-22 13:06:39.549', NULL, NULL, NULL),
(2, 'kgb000ik6rumr1yo9ko0dg5i', 'Editor', 'strapi-editor', 'Editors can manage and publish contents including those of other users.', '2025-02-22 13:06:39.566', '2025-02-22 13:06:39.566', '2025-02-22 13:06:39.567', NULL, NULL, NULL),
(3, 'mjq7zqlatmp3uy2zstavi4qm', 'Author', 'strapi-author', 'Authors can manage the content they have created.', '2025-02-22 13:06:39.575', '2025-02-22 13:06:39.575', '2025-02-22 13:06:39.575', NULL, NULL, NULL);

INSERT INTO public.admin_users_roles_lnk (id, user_id, role_id, role_ord, user_ord)
VALUES (1, 1, 1, 1, 1);

SELECT pg_catalog.setval('public.admin_roles_id_seq', 3, true);
SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);
SELECT pg_catalog.setval('public.admin_users_roles_lnk_id_seq', 1, true);
