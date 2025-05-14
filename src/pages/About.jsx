"use client"

import { NavLink } from "react-router-dom"
import { ArrowLeft, Globe, Heart, Mail, MapPin, Mountain, Phone, Shield, Users } from "lucide-react"
// Данные о команде
const teamMembers = [
  {
    name: "Алексей Иванов",
    role: "Основатель и руководитель",
    bio: "Профессиональный альпинист с 20-летним опытом. Покорил все семь вершин мира, включая Эверест дважды. Основал компанию в 2015 году с целью сделать горные восхождения более доступными и безопасными.",
    image: "/placeholder.svg?height=300&width=300&text=Алексей",
  },
  {
    name: "Елена Петрова",
    role: "Главный инструктор",
    bio: "Мастер спорта по альпинизму, инструктор международного класса. Более 15 лет опыта в организации экспедиций. Специализируется на технически сложных маршрутах и обучении начинающих альпинистов.",
    image: "/placeholder.svg?height=300&width=300&text=Елена",
  },
  {
    name: "Михаил Соколов",
    role: "Руководитель безопасности",
    bio: "Бывший спасатель МЧС с опытом работы в горах более 12 лет. Разрабатывает протоколы безопасности для всех маршрутов и обеспечивает подготовку гидов по вопросам безопасности и первой помощи.",
    image: "/placeholder.svg?height=300&width=300&text=Михаил",
  },
  {
    name: "Ольга Смирнова",
    role: "Координатор экспедиций",
    bio: "Опытный логист и организатор с более чем 10-летним опытом в туризме. Отвечает за безупречную организацию каждой экспедиции, от транспорта и проживания до питания и снаряжения.",
    image: "/placeholder.svg?height=300&width=300&text=Ольга",
  },
]

// Данные о достижениях
const achievements = [
  { number: "500+", text: "Успешных восхождений" },
  { number: "50+", text: "Уникальных маршрутов" },
  { number: "25+", text: "Стран присутствия" },
  { number: "10,000+", text: "Довольных клиентов" },
]

// Данные о ценностях
const values = [
  {
    icon: <Shield className="h-8 w-8 text-[#778DA9]" />,
    title: "Безопасность",
    description:
      "Безопасность всегда на первом месте. Мы используем только проверенное снаряжение, следуем строгим протоколам и постоянно обучаем наших гидов новейшим техникам безопасности.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#778DA9]" />,
    title: "Профессионализм",
    description:
      "Наши гиды — сертифицированные профессионалы с многолетним опытом. Они не только обеспечивают безопасность, но и делятся глубокими знаниями о горах, культуре и природе.",
  },
  {
    icon: <Heart className="h-8 w-8 text-[#778DA9]" />,
    title: "Страсть к горам",
    description:
      "Мы искренне любим горы и стремимся передать эту страсть нашим клиентам. Для нас восхождение — это не просто физическое достижение, но и духовный опыт.",
  },
  {
    icon: <Globe className="h-8 w-8 text-[#778DA9]" />,
    title: "Экологичность",
    description:
      "Мы бережно относимся к природе и следуем принципу «не оставлять следов». Наши экспедиции минимизируют воздействие на окружающую среду и поддерживают местные экологические инициативы.",
  },
]

export default function About() {
  return (
    <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-6">
        {/* Навигация */}
        <NavLink to="/" className="font-medium inline-flex items-center text-[#778DA9] hover:text-blue-600 no-underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> На главную
        </NavLink>

        {/* Заголовок страницы */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О нас</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы помогаем людям покорять вершины и открывать для себя красоту гор уже более 8 лет
          </p>
        </div>

        {/* Миссия и видение */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Mountain className="h-8 w-8 text-[#778DA9] mr-2" />
                Наша миссия
              </h2>
              <p className="text-gray-700 mb-4">
                Делать горные восхождения доступными, безопасными и незабываемыми для людей с разным уровнем подготовки.
                Мы стремимся открыть мир высокогорья для каждого, кто мечтает о покорении вершин.
              </p>
              <p className="text-gray-700">
                Наша цель — не просто организовать восхождение, а создать уникальный опыт, который изменит жизнь наших
                клиентов, расширит их границы возможного и подарит незабываемые впечатления.
              </p>
            </div>
            <div className="h-64 md:h-auto">
              <img
                src="https://i.ibb.co/Pdyj9Mz/i-6.webp"
                alt="Альпинисты на вершине горы"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Достижения */}
        <div className="bg-gradient-to-r from-[#778DA9] to-blue-800 rounded-lg shadow-lg p-8 mb-6 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши достижения</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold mb-2">{achievement.number}</p>
                <p className="text-lg">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* История компании */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-center">История компании</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-8 pb-8 border-l-2 border-[#778DA9]">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#778DA9]"></div>
              <h3 className="text-xl font-semibold text-[#778DA9] mb-2">2015 — Основание</h3>
              <p className="text-gray-700 mb-4">
                Компания была основана Алексеем Ивановым, профессиональным альпинистом, после его второго восхождения на
                Эверест. Начав с организации восхождений на Эльбрус, компания быстро завоевала репутацию надежного
                партнера для любителей гор.
              </p>
            </div>
            <div className="relative pl-8 pb-8 border-l-2 border-[#778DA9]">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#778DA9]"></div>
              <h3 className="text-xl font-semibold text-[#778DA9] mb-2">2017 — Международная экспансия</h3>
              <p className="text-gray-700 mb-4">
                Расширение географии маршрутов: Альпы, Гималаи, Анды. Формирование международной команды гидов и
                инструкторов. Первые восхождения на семитысячники с клиентами.
              </p>
            </div>
            <div className="relative pl-8 pb-8 border-l-2 border-[#778DA9]">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#778DA9]"></div>
              <h3 className="text-xl font-semibold text-[#778DA9] mb-2">2019 — Образовательное направление</h3>
              <p className="text-gray-700 mb-4">
                Запуск образовательных программ и курсов по альпинизму для начинающих. Открытие тренировочных центров в
                крупных городах. Разработка собственных методик подготовки к восхождениям.
              </p>
            </div>
            <div className="relative pl-8 pb-8 border-l-2 border-[#778DA9] last:border-0">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#778DA9]"></div>
              <h3 className="text-xl font-semibold text-[#778DA9] mb-2">2022 — Цифровая трансформация</h3>
              <p className="text-gray-700 mb-4">
                Запуск онлайн-платформы для планирования восхождений. Внедрение передовых технологий для повышения
                безопасности. Создание сообщества альпинистов и любителей гор.
              </p>
            </div>
          </div>
        </div>

        {/* Наши ценности */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex">
                <div className="mr-4 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Команда */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p className="text-gray-700">+7 (800) 123-45-67</p>
              <p className="text-gray-700">Пн-Пт, 9:00-18:00</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-700">info@alter-ego.ru</p>
              <p className="text-gray-700">support@alter-ego.ru</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-gray-700">г. Казань, ул. Большая Красная, 55</p>
              <p className="text-gray-700">Офис 45, 3 этаж</p>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-[#778DA9] to-blue-800 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Готовы покорить свою вершину?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Присоединяйтесь к нам и откройте для себя удивительный мир высокогорья. Мы поможем вам подготовиться и
            безопасно достичь вашей цели.
          </p>
          <NavLink
            to="/"
            className="inline-block px-6 py-3 bg-white text-[#778DA9] font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Найти восхождение
          </NavLink>
        </div>
      </div>

    </div>
  )
}
