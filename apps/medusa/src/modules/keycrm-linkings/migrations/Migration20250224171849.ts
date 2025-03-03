import { Migration } from '@mikro-orm/migrations';

export class Migration20250224171849 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "linking" drop constraint if exists "linking_handle_unique";`);
    this.addSql(`alter table if exists "linking" drop constraint if exists "linking_keycrm_product_id_unique";`);
    this.addSql(`create table if not exists "linking" ("id" text not null, "keycrm_product_id" integer not null, "handle" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "linking_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_linking_keycrm_product_id_unique" ON "linking" (keycrm_product_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_linking_handle_unique" ON "linking" (handle) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_linking_deleted_at" ON "linking" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "linking" cascade;`);
  }

}
