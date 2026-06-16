create table if not exists public.ratings (
  id bigserial primary key,
  paper_id text not null unique,
  scores jsonb not null,
  average numeric(5, 2) not null,
  created_at timestamptz not null default now(),
  constraint ratings_scores_array check (
    jsonb_typeof(scores) = 'array'
    and jsonb_array_length(scores) between 1 and 5
  ),
  constraint ratings_average_nonnegative check (average >= 0)
);

create unique index if not exists ratings_paper_id_lower_idx on public.ratings (lower(paper_id));

alter table public.ratings enable row level security;

drop policy if exists "ratings are publicly readable" on public.ratings;
drop policy if exists "ratings are publicly insertable" on public.ratings;

create policy "ratings are publicly readable"
on public.ratings
for select
to anon
using (true);

create policy "ratings are publicly insertable"
on public.ratings
for insert
to anon
with check (
  paper_id <> ''
  and jsonb_typeof(scores) = 'array'
  and jsonb_array_length(scores) between 1 and 5
  and average >= 0
);

grant usage on schema public to anon;
grant select, insert on public.ratings to anon;
grant usage, select on sequence public.ratings_id_seq to anon;

with seed_records(paper_id, scores) as (
  values
    ('366', '[3,2,4,4,2]'::jsonb),
    ('438', '[4,4,4,4]'::jsonb),
    ('642', '[2,3,2,3,2]'::jsonb),
    ('666', '[3,4,1,2,2]'::jsonb),
    ('4029', '[5,2,4,2,3]'::jsonb),
    ('4424', '[3,2,2,2,2]'::jsonb),
    ('5142', '[4,2,2,3]'::jsonb),
    ('5693', '[4,3,4,2,2]'::jsonb),
    ('7053', '[2,2,3,2,3]'::jsonb),
    ('7092', '[4,4,4,3]'::jsonb),
    ('7096', '[4,4,4,4]'::jsonb),
    ('7281', '[3,2,2,2,3]'::jsonb),
    ('7334', '[3,3,5,4,4]'::jsonb),
    ('7838', '[3,3,3,2]'::jsonb),
    ('8953', '[4,4,4,3,2]'::jsonb),
    ('5590', '[2,2,3,2,3]'::jsonb),
    ('5368', '[3,3,4,4,3]'::jsonb),
    ('4052', '[3,4,4,4,2]'::jsonb),
    ('2241', '[2,2,2,3,2]'::jsonb),
    ('6856', '[2,2,2,3]'::jsonb),
    ('4925', '[2,2,4,5,5]'::jsonb),
    ('5641', '[3,3,3,4]'::jsonb),
    ('4813', '[3,4,1,4,1]'::jsonb),
    ('5303', '[3,2,2,2,2]'::jsonb),
    ('8635', '[2,2,2,2,3]'::jsonb),
    ('2359', '[4,3,3,2]'::jsonb),
    ('5814', '[3,3,2,3,2]'::jsonb),
    ('6691', '[1,4,3,3,2]'::jsonb),
    ('8706', '[2,3,2,2,3]'::jsonb),
    ('8827', '[3,2,2,2,3]'::jsonb),
    ('7817', '[4,4,4,4]'::jsonb),
    ('7820', '[2,2,2,2,2]'::jsonb),
    ('9413', '[4,1,4,4]'::jsonb),
    ('4077', '[5,4,3,5]'::jsonb),
    ('9700', '[2,3,3,1,2]'::jsonb),
    ('7391', '[4,4,3,3]'::jsonb),
    ('1', '[2,2,2,3]'::jsonb),
    ('2833', '[4,4,3,4]'::jsonb),
    ('100000', '[1,1,1,1]'::jsonb),
    ('2979', '[1,2,2,3]'::jsonb),
    ('4358', '[3,3,4,4,5]'::jsonb),
    ('7378', '[4,5,3,2,3]'::jsonb),
    ('8287', '[4,4,2,4,3]'::jsonb),
    ('12312', '[4,3,3,2]'::jsonb),
    ('3480', '[3,2,2,2,2]'::jsonb),
    ('4586', '[2,2,2,1,2]'::jsonb),
    ('4587', '[2,2,3,2,2]'::jsonb),
    ('6782', '[2,2,3,2]'::jsonb),
    ('6815', '[2,1,2,4,1]'::jsonb),
    ('3788', '[4,3,4,4,4]'::jsonb),
    ('7173', '[3,2,2,4,4]'::jsonb),
    ('7179', '[4,4,3,4]'::jsonb),
    ('5358', '[4,2,2,3,3]'::jsonb),
    ('9650', '[3,2,3,1,2]'::jsonb),
    ('7290', '[3,3,3,5,2]'::jsonb),
    ('9064', '[2,1,3,2,2]'::jsonb),
    ('3691', '[3,3,1,2,3]'::jsonb),
    ('5477', '[2,2,4,4,5]'::jsonb),
    ('5063', '[2,3,4,3,2]'::jsonb),
    ('1001', '[2,4,4,2]'::jsonb),
    ('2180', '[4,4,4,3,2]'::jsonb)
)
insert into public.ratings (paper_id, scores, average, created_at)
select
  paper_id,
  scores,
  (
    select avg(value::text::numeric)
    from jsonb_array_elements(scores) as score_values(value)
  )::numeric(5, 2) as average,
  '2026-06-16T13:28:39+08:00'::timestamptz
from seed_records
on conflict do nothing;
