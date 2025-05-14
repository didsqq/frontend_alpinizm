"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CLIMB_ROUTE } from "../utils/consts"
import { fetchAlpinistClimb, cancelAlpinistClimb } from "../http/climbsAPI"
import { Context } from "../context"
import { observer } from "mobx-react-lite"

import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  Mountain,
  Star,
  ThermometerSnowflake,
  User,
  X,
  Users,
} from "lucide-react"
import { fetchUser } from "../http/userAPI"

// Статистика пользователя
const userStats = {
  totalClimbs: 2,
  totalMountains: 2,
  highestAltitude: "5,642м (Эльбрус)",
  upcomingClimbs: 2,
  cancelledClimbs: 1,
  totalSpent: "65,000 ₽",
  totalDistance: "42 км",
  countries: ["Россия", "Грузия", "Франция", "Аргентина", "Танзания"],
}

function Reservation() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [climbs, setClimbs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null)

  const loadClimbs = async () => {
    try {
      setLoading(true)
      const data = await fetchAlpinistClimb()
      setClimbs(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClimbs()
  }, [])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser()
        setCurrentUser(userData)
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error)
      }
    }
    loadUser()
  }, [])

  // Обработчик отмены восхождения
  const handleCancelClimb = async (id) => {
    try {
      await cancelAlpinistClimb(id)
      // После успешной отмены перезагружаем список восхождений
      await loadClimbs()
    } catch (error) {
      console.error('Ошибка при отмене восхождения:', error)
      setError('Ошибка при отмене восхождения')
    }
  }

  // Фильтрация восхождений по статусу (вкладке)
  const filteredClimbs = climbs
    .filter((c) => c.Status === activeTab)
    .sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime()) // Сортировка по дате

  // Получение класса статуса для отображения
  const getStatusClass = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Получение текста статуса для отображения
  const getStatusText = (Status) => {
    switch (Status) {
      case "upcoming":
        return "Предстоит"
      case "completed":
        return "Завершено"
      case "canceled":
        return "Отменено"
      default:
        return "Неизвестно"
    }
  }

  return (


      <div className="container mx-auto px-4 py-6">
        {/* Шапка страницы */}
        <header className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Мои восхождения</h1>
              <p className="text-gray-600">Управляйте своими восхождениями и просматривайте историю</p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-blue-50 rounded-lg p-3 flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#778DA9] flex items-center justify-center text-white mr-3">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{currentUser ? `${currentUser.Name} ${currentUser.Surname}` : 'Загрузка...'}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mountain className="h-3 w-3 mr-1" />
                    <span>{climbs.length} восхождений</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Статистика пользователя */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br bg-[#33465c] rounded-lg p-4 text-white">
              <p className="text-sm opacity-80 mb-1">Всего восхождений</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{climbs.length}</p>
                <Mountain className="h-8 w-8 opacity-70" />
              </div>
            </div>
            <div className="bg-gradient-to-br bg-[#054b47] rounded-lg p-4 text-white">
              <p className="text-sm opacity-80 mb-1">Предстоит восхождений</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{climbs.filter(c => c.Status === "upcoming").length}</p>
                <Calendar className="h-8 w-8 opacity-70" />
              </div>
            </div>
            <div className="bg-gradient-to-br bg-[#ee6c4d] rounded-lg p-4 text-white">
              <p className="text-sm opacity-80 mb-1">Посещено стран</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{userStats.countries.length}</p>
                <MapPin className="h-8 w-8 opacity-70" />
              </div>
            </div>
            <div className="bg-gradient-to-br bg-[#b82843] rounded-lg p-4 text-white">
              <p className="text-sm opacity-80 mb-1">Максимальная высота</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">5,642м</p>
                <Mountain className="h-8 w-8 opacity-70" />
              </div>
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <div>
          {/* Вкладки */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Предстоящие ({climbs.filter((c) => c.Status === "upcoming").length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === "completed"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Завершенные ({climbs.filter((c) => c.Status === "completed").length})
              </button>
              <button
                onClick={() => setActiveTab("canceled")}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === "canceled"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Отмененные ({climbs.filter((c) => c.Status === "canceled").length})
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Clock className="h-8 w-8 animate-spin" />
              </div>
              <h3 className="text-lg font-medium mb-2">Загрузка данных...</h3>
            </div>
          ) : error ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                <X className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ошибка при загрузке данных</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClimbs.length > 0 ? (
                filteredClimbs.map((climb) => (
                  <div
                    key={climb.ID}
                    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={climb.PhotoUrl || "/placeholder.svg"}
                          alt={climb.Title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            climb.Status,
                          )}`}
                        >
                          {getStatusText(climb.Status)}
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{climb.Title}</h3>
                            <p className="text-gray-600 flex items-center mb-2">
                              <Mountain className="h-4 w-4 mr-1 text-blue-600" />
                              {climb.Mountain?.Title}, {climb.Mountain?.MountainRange}
                            </p>
                            <div className="flex items-center text-gray-700 mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{climb.StartDate}</span>
                            </div>
                            <div className="flex items-center text-gray-700 mb-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{climb.Duration}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <ThermometerSnowflake className="h-4 w-4 mr-1" />
                              <span>{climb.Season}</span>
                            </div>
                          </div>

                          <div className="mt-4 md:mt-0 flex flex-col gap-2 w-full md:w-auto">
                            <button
                              onClick={() => navigate(CLIMB_ROUTE + '/' + climb.ID)}
                              className="inline-flex items-center justify-center border-none bg-[#778DA9] text-white hover:bg-[#778DA9]/80 font-medium py-2 px-8 rounded-lg transition-colors min-w-[200px]"
                            >
                              Подробнее <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                            {activeTab === "upcoming"
                      ?
                            <button
                              onClick={() => handleCancelClimb(climb.ID)}
                              className="inline-flex items-center justify-center border-none bg-[#b82843] text-white hover:bg-[#b82843]/80 font-medium py-2 px-8 rounded-lg transition-colors min-w-[200px]"
                            >
                              Отменить восхождение
                            </button>
                            : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#778DA9] text-white mb-4">
                    {activeTab === "upcoming" ? (
                      <Calendar className="h-8 w-8" />
                    ) : activeTab === "completed" ? (
                      <CheckCircle className="h-8 w-8" />
                    ) : (
                      <X className="h-8 w-8" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    {activeTab === "upcoming"
                      ? "У вас нет предстоящих восхождений"
                      : activeTab === "completed"
                        ? "У вас нет завершенных восхождений"
                        : "У вас нет отмененных восхождений"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === "upcoming"
                      ? "Запишитесь на восхождение, чтобы оно появилось здесь"
                      : activeTab === "completed"
                        ? "Завершенные восхождения будут отображаться здесь"
                        : "Отмененные восхождения будут отображаться здесь"}
                  </p>
                  {activeTab === "upcoming" && (
                    <button
                      onClick={() => navigate("/")}
                      className="inline-flex items-center px-4 py-2 bg-[#778DA9] text-white rounded-md hover:bg-[#778DA9]/80 transition-colors"
                    >
                      Найти восхождение
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

  )
}


export default Reservation;
