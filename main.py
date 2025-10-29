#!/usr/bin/env python3
"""
Скрипт полной автоматической установки и настройки Strapi для галереи
Создает новый проект и настраивает content types
"""

import json
import os
import subprocess
import sys
import time
from pathlib import Path
import shutil


class StrapiFullSetup:
    def __init__(self, project_name, parent_directory):
        """
        Инициализация полной настройки Strapi
        
        Args:
            project_name: Имя нового Strapi проекта
            parent_directory: Директория где создать проект
        """
        self.project_name = project_name
        self.parent_dir = Path(parent_directory)
        self.project_path = self.parent_dir / project_name
        self.src_path = self.project_path / "src"
        self.api_path = self.src_path / "api"
    
    def fix_npm_directory(self):
        """Исправляет отсутствующую директорию npm"""
        npm_dir = Path(os.getenv('APPDATA')) / 'npm'
        
        if not npm_dir.exists():
            print(f"🔧 Создание отсутствующей директории npm...")
            try:
                npm_dir.mkdir(parents=True, exist_ok=True)
                print(f"✅ Директория создана: {npm_dir}")
                return True
            except Exception as e:
                print(f"❌ Не удалось создать директорию: {e}")
                return False
        else:
            print(f"✅ Директория npm существует: {npm_dir}")
            return True
        
    def check_node_installed(self):
        """Проверяет установлен ли Node.js"""
        try:
            result = subprocess.run(['node', '--version'], 
                                  capture_output=True, 
                                  text=True, 
                                  shell=True)
            if result.returncode == 0:
                print(f"✅ Node.js установлен: {result.stdout.strip()}")
                return True
            else:
                print("❌ Node.js не найден!")
                return False
        except Exception as e:
            print(f"❌ Ошибка при проверке Node.js: {e}")
            return False
    
    def check_npm_installed(self):
        """Проверяет установлен ли npm"""
        try:
            result = subprocess.run(['npm', '--version'], 
                                  capture_output=True, 
                                  text=True, 
                                  shell=True)
            if result.returncode == 0:
                print(f"✅ npm установлен: {result.stdout.strip()}")
                return True
            else:
                print("❌ npm не найден!")
                return False
        except Exception as e:
            print(f"❌ Ошибка при проверке npm: {e}")
            return False
    
    def create_strapi_project(self):
        """Создает новый Strapi проект"""
        print("\n🚀 Создание нового Strapi проекта...")
        print(f"📁 Директория: {self.project_path}")
        
        # Проверяем существует ли уже проект
        if self.project_path.exists():
            print(f"⚠️ Проект '{self.project_name}' уже существует. Удаление...")
            shutil.rmtree(self.project_path)
        
        # Создаем проект
        try:
            # Переходим в родительскую директорию
            os.chdir(self.parent_dir)
            
            print("\n⏳ Создание Strapi проекта (это может занять несколько минут)...")
            print("💡 Команда: npx -y create-strapi-app@latest --quickstart --no-run")
            
            # ВАЖНО: добавлен флаг -y для автоматического принятия
            cmd = f'npx -y create-strapi-app@latest {self.project_name} --quickstart --no-run'
            
            # Запускаем процесс и показываем вывод в реальном времени
            process = subprocess.Popen(
                cmd,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            # Читаем и выводим результат
            for line in process.stdout:
                print(line, end='')
            
            process.wait()
            
            if process.returncode == 0:
                print("\n✅ Strapi проект успешно создан!")
                return True
            else:
                print(f"\n❌ Ошибка при создании проекта (код: {process.returncode})")
                return False
                
        except Exception as e:
            print(f"\n❌ Непредвиденная ошибка: {e}")
            return False
    
    def create_gallery_content_type(self):
        """Создает content type для галерей"""
        gallery_path = self.api_path / "gallery"
        content_types_path = gallery_path / "content-types" / "gallery"
        
        content_types_path.mkdir(parents=True, exist_ok=True)
        
        schema = {
            "kind": "collectionType",
            "collectionName": "galleries",
            "info": {
                "singularName": "gallery",
                "pluralName": "galleries",
                "displayName": "Gallery",
                "description": "Photo gallery collection"
            },
            "options": {
                "draftAndPublish": True
            },
            "pluginOptions": {},
            "attributes": {
                "title": {
                    "type": "string",
                    "required": True
                },
                "description": {
                    "type": "text"
                },
                "slug": {
                    "type": "uid",
                    "targetField": "title"
                },
                "photos": {
                    "type": "relation",
                    "relation": "oneToMany",
                    "target": "api::photo.photo",
                    "mappedBy": "gallery"
                },
                "featured": {
                    "type": "boolean",
                    "default": False
                },
                "coverImage": {
                    "type": "media",
                    "multiple": False,
                    "required": False,
                    "allowedTypes": ["images"]
                }
            }
        }
        
        with open(content_types_path / "schema.json", "w", encoding="utf-8") as f:
            json.dump(schema, f, indent=2, ensure_ascii=False)
        
        print("✅ Gallery content type создан")
        
    def create_photo_content_type(self):
        """Создает content type для фотографий"""
        photo_path = self.api_path / "photo"
        content_types_path = photo_path / "content-types" / "photo"
        
        content_types_path.mkdir(parents=True, exist_ok=True)
        
        schema = {
            "kind": "collectionType",
            "collectionName": "photos",
            "info": {
                "singularName": "photo",
                "pluralName": "photos",
                "displayName": "Photo",
                "description": "Individual photos in galleries"
            },
            "options": {
                "draftAndPublish": True
            },
            "pluginOptions": {},
            "attributes": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "text"
                },
                "image": {
                    "type": "media",
                    "multiple": False,
                    "required": True,
                    "allowedTypes": ["images"]
                },
                "gallery": {
                    "type": "relation",
                    "relation": "manyToOne",
                    "target": "api::gallery.gallery",
                    "inversedBy": "photos"
                },
                "order": {
                    "type": "integer",
                    "default": 0
                },
                "tags": {
                    "type": "json"
                }
            }
        }
        
        with open(content_types_path / "schema.json", "w", encoding="utf-8") as f:
            json.dump(schema, f, indent=2, ensure_ascii=False)
        
        print("✅ Photo content type создан")
        
    def create_controllers(self):
        """Создает controllers"""
        # Gallery controller
        gallery_controllers_path = self.api_path / "gallery" / "controllers"
        gallery_controllers_path.mkdir(parents=True, exist_ok=True)
        
        gallery_controller = """'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gallery.gallery', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const entities = await strapi.entityService.findMany('api::gallery.gallery', {
      ...query,
      populate: { photos: true, coverImage: true },
    });
    return entities;
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const entity = await strapi.entityService.findOne('api::gallery.gallery', id, {
      ...query,
      populate: { photos: true, coverImage: true },
    });
    return entity;
  },
}));
"""
        
        with open(gallery_controllers_path / "gallery.js", "w", encoding="utf-8") as f:
            f.write(gallery_controller)
        
        # Photo controller
        photo_controllers_path = self.api_path / "photo" / "controllers"
        photo_controllers_path.mkdir(parents=True, exist_ok=True)
        
        photo_controller = """'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::photo.photo', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const entities = await strapi.entityService.findMany('api::photo.photo', {
      ...query,
      populate: { image: true, gallery: true },
    });
    return entities;
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const entity = await strapi.entityService.findOne('api::photo.photo', id, {
      ...query,
      populate: { image: true, gallery: true },
    });
    return entity;
  },
}));
"""
        
        with open(photo_controllers_path / "photo.js", "w", encoding="utf-8") as f:
            f.write(photo_controller)
        
        print("✅ Controllers созданы")
        
    def create_routes(self):
        """Создает routes"""
        # Gallery routes
        gallery_routes_path = self.api_path / "gallery" / "routes"
        gallery_routes_path.mkdir(parents=True, exist_ok=True)
        
        gallery_routes = {
            "routes": [
                {"method": "GET", "path": "/galleries", "handler": "gallery.find"},
                {"method": "GET", "path": "/galleries/:id", "handler": "gallery.findOne"},
                {"method": "POST", "path": "/galleries", "handler": "gallery.create"},
                {"method": "PUT", "path": "/galleries/:id", "handler": "gallery.update"},
                {"method": "DELETE", "path": "/galleries/:id", "handler": "gallery.delete"}
            ]
        }
        
        with open(gallery_routes_path / "gallery.json", "w", encoding="utf-8") as f:
            json.dump(gallery_routes, f, indent=2)
        
        # Photo routes
        photo_routes_path = self.api_path / "photo" / "routes"
        photo_routes_path.mkdir(parents=True, exist_ok=True)
        
        photo_routes = {
            "routes": [
                {"method": "GET", "path": "/photos", "handler": "photo.find"},
                {"method": "GET", "path": "/photos/:id", "handler": "photo.findOne"},
                {"method": "POST", "path": "/photos", "handler": "photo.create"},
                {"method": "PUT", "path": "/photos/:id", "handler": "photo.update"},
                {"method": "DELETE", "path": "/photos/:id", "handler": "photo.delete"}
            ]
        }
        
        with open(photo_routes_path / "photo.json", "w", encoding="utf-8") as f:
            json.dump(photo_routes, f, indent=2)
        
        print("✅ Routes созданы")
        
    def create_services(self):
        """Создает services"""
        # Gallery service
        gallery_services_path = self.api_path / "gallery" / "services"
        gallery_services_path.mkdir(parents=True, exist_ok=True)
        
        gallery_service = """'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gallery.gallery');
"""
        
        with open(gallery_services_path / "gallery.js", "w", encoding="utf-8") as f:
            f.write(gallery_service)
        
        # Photo service
        photo_services_path = self.api_path / "photo" / "services"
        photo_services_path.mkdir(parents=True, exist_ok=True)
        
        photo_service = """'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::photo.photo');
"""
        
        with open(photo_services_path / "photo.js", "w", encoding="utf-8") as f:
            f.write(photo_service)
        
        print("✅ Services созданы")
    
    def create_instructions(self):
        """Создает файл с инструкциями"""
        instructions = f"""
╔══════════════════════════════════════════════════════════════╗
║     STRAPI GALLERY - ИНСТРУКЦИИ ПО ЗАПУСКУ                   ║
╚══════════════════════════════════════════════════════════════╝

✅ Проект успешно создан: {self.project_path}

📋 ШАГ 1: Запустите Strapi
────────────────────────────────────────────────────────────────
cd "{self.project_path}"
npm run develop

🌐 Strapi откроется по адресу: http://localhost:1337/admin

📋 ШАГ 2: Создайте первого администратора
────────────────────────────────────────────────────────────────
При первом запуске откроется форма регистрации администратора

📋 ШАГ 3: Настройте Permissions
────────────────────────────────────────────────────────────────
Settings → Users & Permissions Plugin → Roles → Public

Разрешите для Gallery и Photo:
✅ find, findOne, create, update, delete

Разрешите для Upload:
✅ upload

📋 ШАГ 4: Подключите React
────────────────────────────────────────────────────────────────
Создайте .env в React проекте:
REACT_APP_STRAPI_URL=http://localhost:1337
"""
        
        with open(self.project_path / "SETUP_INSTRUCTIONS.txt", "w", encoding="utf-8") as f:
            f.write(instructions)
        
        print("✅ Инструкции сохранены")
    
    def run_full_setup(self):
        """Запускает полную настройку"""
        print("╔══════════════════════════════════════════════════════════════╗")
        print("║     STRAPI GALLERY - ПОЛНАЯ АВТОМАТИЧЕСКАЯ УСТАНОВКА        ║")
        print("╚══════════════════════════════════════════════════════════════╝")
        print()
        
        # Проверяем и исправляем npm директорию
        print("🔍 Проверка npm директории...")
        if not self.fix_npm_directory():
            return False
        
        # Проверяем системные требования
        print("\n🔍 Проверка системных требований...")
        if not self.check_node_installed() or not self.check_npm_installed():
            return False
        
        # Создаем Strapi проект
        if not self.create_strapi_project():
            return False
        
        # Ждем немного
        print("\n⏳ Ожидание завершения инициализации...")
        time.sleep(2)
        
        # Настраиваем content types
        print("\n🔧 Настройка content types...")
        try:
            self.create_gallery_content_type()
            self.create_photo_content_type()
            self.create_controllers()
            self.create_routes()
            self.create_services()
            self.create_instructions()
            
            print("\n" + "="*60)
            print("✨ УСТАНОВКА ЗАВЕРШЕНА УСПЕШНО!")
            print("="*60)
            print(f"\n📁 Проект: {self.project_path}")
            print(f"\n🚀 Для запуска:")
            print(f'   cd "{self.project_path}"')
            print("   npm run develop")
            
            return True
            
        except Exception as e:
            print(f"\n❌ Ошибка: {e}")
            import traceback
            traceback.print_exc()
            return False


def main():
    print()
    
    project_name = input("Имя проекта (Enter = my-strapi-gallery): ").strip()
    if not project_name:
        project_name = "my-strapi-gallery"
    
    parent_dir = input("Директория (Enter = текущая): ").strip()
    if not parent_dir:
        parent_dir = os.getcwd()
    
    print()
    
    setup = StrapiFullSetup(project_name, parent_dir)
    setup.run_full_setup()


if __name__ == "__main__":
    main()
