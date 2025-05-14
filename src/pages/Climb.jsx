"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, Compass, Mountain, Star, ThermometerSnowflake, Users, Wind, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchClimb, recordAlpinistClimb } from "../http/climbsAPI"

import { Context } from "../context"

export default function RoutePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImage, setSelectedImage] = useState(0)
  const { store, user } = useContext(Context)
  const routeId = params.id
  const [climb, setClimb] = useState(null)
  const [registrationStatus, setRegistrationStatus] = useState({ message: '', type: '' })
  const [modalGuide, setModalGuide] = useState(null)

  useEffect(() => {
    fetchClimb(routeId).then(setClimb)
  }, [routeId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [routeId])

  const nextImage = () => {
    if (climb?.Images) {
      setSelectedImage((prev) => (prev + 1) % climb.Images.length)
    }
  }

  const prevImage = () => {
    if (climb?.Images) {
      setSelectedImage((prev) => (prev - 1 + climb.Images.length) % climb.Images.length)
    }
  }

  const handleRegistration = async () => {
    try {
      const response = await recordAlpinistClimb(routeId)
      setRegistrationStatus({
        message: 'Вы успешно зарегистрировались на восхождение! Дополнительная информация будет отправлена на ваш email',
        type: 'success'
      })
    } catch (error) {
      setRegistrationStatus({
        message: error.response?.data?.message || 'Произошла ошибка при регистрации',
        type: 'error'
      })
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Модальное окно для телефона тимлидера */}
      {modalGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setModalGuide(null)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Контакт гида</h2>
            <div className="text-center mb-2 text-lg font-medium">{modalGuide.SurnameName}</div>
            <div className="text-center text-gray-700 mb-4">Телефон: <span className="font-semibold">{modalGuide.Phone || 'Не указан'}</span></div>
            <button
              className="w-full bg-[#778DA9] hover:bg-[#41506b] text-white font-medium py-2 px-6 rounded transition-colors"
              onClick={() => setModalGuide(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="font-medium inline-flex items-center text-[#778DA9] hover:text-blue-600 no-underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Вернуться к списку маршрутов
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          {/* Галерея изображений */}
          <div className="relative h-80 md:h-96 bg-gray-100">
            <img
              src={climb?.Images?.[selectedImage]?.ImageUrl || "/placeholder.svg"}
              alt={climb?.Title}
              className="w-full h-full object-cover"
            />
            {climb?.Images && climb.Images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="border-none absolute left-4 top-1/2 -translate-y-1/2  rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="border-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2"
                >   
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {climb?.Images?.map((_, index) => (
                <button
                  key={index}
                  className={`border-none w-3 h-3 rounded-full ${selectedImage === index ? "bg-[#1B263B]" : "bg-[#1B263B]/50"}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Заголовок и основная информация */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{climb?.Title}</h1>
                <p className="text-gray-600 flex items-center mb-2">
                  <Mountain className="h-5 w-5 mr-1 text-[#778DA9]" />
                  {climb?.Mountain?.Title}, {climb?.Mountain?.MountainRange}
                </p>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{climb?.Rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                <div className="bg-[#778DA9] text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Сложность: {climb?.Category}
                </div>
                <div className="flex items-center text-gray-700 mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{climb?.Duration}</span>
                </div>
                <div className="flex items-center text-gray-700 mb-1">
                  <Compass className="h-4 w-4 mr-1" />
                  <span>{climb?.Distance}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Сезон: {climb?.Season}</span>
                </div>
              </div>
            </div>

            {/* Вкладки */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-2 px-1 font-medium text-sm border-b-2 ${
                    activeTab === "overview"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Обзор
                </button>
                <button
                  onClick={() => setActiveTab("guides")}
                  className={`py-2 px-1 font-medium text-sm border-b-2 ${
                    activeTab === "guides"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Гиды
                </button>
              </nav>
            </div>


            {/* Содержимое вкладок */}
            <div>
              {activeTab === "overview" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Описание</h2>
                      <p className="text-gray-700 mb-4">{climb?.Description}</p>

                      <h3 className="text-lg font-semibold mb-2">Необходимое снаряжение</h3>
                      <ul className="list-disc pl-5 text-gray-700 mb-4">
                        {climb?.Equipments?.map((item, index) => (
                          <li key={index}>{item.Title}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Карта маршрута</h2>
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={climb?.MapUrl || "/placeholder.svg"}
                          alt="Карта маршрута"
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Высота</h3>
                        <div className="flex items-center">
                          <Mountain className="h-5 w-5 text-black-600 mr-2" />
                          <span className="text-gray-700">{climb?.Elevation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    {registrationStatus.message && (
                      <div className={`mb-4 p-4 rounded-lg ${
                        registrationStatus.type === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {registrationStatus.message}
                      </div>
                    )}
                    {user.isAuth ? (
                      <button 
                        onClick={handleRegistration}
                        className="border-none bg-[#778DA9] text-white hover:bg-[#778DA9]/80 font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Забронировать восхождение
                      </button>
                    ) : (
                      <div className="text-gray-600">
                        Для регистрации на восхождение необходимо 
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 ml-1">
                          войти в систему
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "guides" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Гиды и инструкторы</h2>
                  <p className="text-gray-700 mb-6">
                    Восхождение на Эльбрус рекомендуется совершать с опытным гидом, особенно если у вас нет опыта
                    высокогорных восхождений. Ниже представлены проверенные гиды с большим опытом работы.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {climb?.TeamLeaders.map((guide, index) => (
                      <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-100">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-10 w-10 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-center mb-1">{guide.SurnameName}</h3>
                        <div className="text-center text-gray-700 mb-1">Опыт: {guide.Experience}</div>
                        <button
                          className="w-full border-none bg-[#778DA9] hover:bg-[#778DA9]/80 text-white font-medium py-2 px-6 rounded transition-colors"
                          onClick={() => setModalGuide(guide)}
                        >
                          Связаться
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
