-- Liderlik tablosu koruması.
-- Supabase Dashboard > SQL Editor'de bir kez çalıştırın.
-- Sınırlar src/main.js içindeki NAME_MAX_LENGTH / SCORE_MAX ile aynı olmalı.

-- 1) Sınırları ihlal eden eski kayıtları temizle (kısıtlar eklenmeden önce).
delete from leaderboard
where char_length(name) not between 1 and 20
   or name ~ '[<>]'
   or score not between 0 and 400000
   or difficulty not in ('easy', 'normal', 'hard')
   or store_type not in ('new_store', 'old_store', 'near_hq');

-- 2) Veritabanı seviyesinde kısıtlar: istemci atlatılsa bile geçersiz satır yazılamaz.
alter table leaderboard
  add constraint leaderboard_name_len   check (char_length(name) between 1 and 20),
  add constraint leaderboard_name_chars check (name !~ '[<>]'),
  add constraint leaderboard_score_rng  check (score between 0 and 400000),
  add constraint leaderboard_difficulty check (difficulty in ('easy', 'normal', 'hard')),
  add constraint leaderboard_store_type check (store_type in ('new_store', 'old_store', 'near_hq')),
  add constraint leaderboard_date_len   check (char_length(date) <= 16);

-- 3) Anonim kullanıcı sadece okuyup ekleyebilsin; güncelleme/silme politikası yok.
--    (Mevcut insert politikanızın adı farklıysa önce onu drop edin.)
alter table leaderboard enable row level security;
revoke update, delete, truncate on leaderboard from anon, authenticated;

-- Not: Bu adım sahte skor yazılmasını tamamen engellemez, sadece sınırlar.
-- Tam çözüm skoru sunucuda hesaplamaktır (Edge Function + oyun kaydı doğrulama).
