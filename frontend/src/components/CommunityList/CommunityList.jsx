import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faSearch, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import api from '../../Api';
import { getUserIdFromToken } from '../../utils/auth';
import { showToast } from '../../utils/toast';
import './CommunityList.scss';

const CommunityList = ({ isDarkMode }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedCommunities, setRecommendedCommunities] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setCurrentUserId(userIdFromToken);
    fetchCommunities();
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await api.getAllSpecialties();
      setSpecialties(response);
    } catch (err) {
      console.error('Ошибка при загрузке специальностей:', err);
    }
  };

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await api.getAllCommunities();
      setCommunities(response);
      const sorted = [...response].sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0));
      setRecommendedCommunities(sorted.slice(0, 4));
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке сообществ:', err);
      setError('Не удалось загрузить сообщества');
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      if (!currentUserId) {
        showToast.error('Необходима авторизация');
        return;
      }
      const response = await api.joinCommunity(currentUserId, communityId);
      showToast.success('Вы присоединились к сообществу');
      fetchCommunities();
    } catch (err) {
      console.error('Ошибка при присоединении к сообществу:', err);
      showToast.error('Не удалось присоединиться к сообществу');
    }
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = searchQuery === '' || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || 
      community.specialtyId === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return <div className="community-list-loading">Загрузка сообществ...</div>;
  }

  if (error) {
    return <div className="community-list-error">{error}</div>;
  }

  const renderCommunityCard = (community, isRecommended = false) => (
    <div key={community.id} className={`community-card ${isRecommended ? 'recommended' : ''}`}>
      <div className="community-info">
        <h3>{community.name}</h3>
        <p>{community.description}</p>
        <div className="community-meta">
          <span className="members-count">
            <FontAwesomeIcon icon={faUsers} />
            {community.members?.length || 0} участников
          </span>
        </div>
      </div>
      <div className="community-actions">
        <Link to={`/community/${community.id}/chat`} className="join-community-btn">
          Чат
        </Link>
        <Link to={`/communities/${community.id}`} className="view-community-btn">
          Просмотреть
        </Link>
        {!community.members?.some(member => member.userId === currentUserId) && (
          <button
            onClick={() => handleJoinCommunity(community.id)}
            className="join-community-btn"
          >
            Присоединиться
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={`community-list ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="community-header">
        <h2 className='me-4'>Сообщества</h2>
        <Link to="/communities/create" className="create-community-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>Создать сообщество</span>
        </Link>
      </div>

      <div className="community-filters">
        <div className="search-input-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder=" Поиск сообществ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="specialty-select-wrapper">
          <FontAwesomeIcon icon={faGraduationCap} className="specialty-icon" />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="specialty-select"
          >
            <option value=""> Все специальности</option>
            {specialties.map(specialty => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {communities.length === 0 ? (
        <div className="no-communities">
          <FontAwesomeIcon icon={faUsers} size="2x" />
          <p>Нет доступных сообществ</p>
          <Link to="/communities/create" className="create-first-community-btn">
            Создать первое сообщество
          </Link>
        </div>
      ) : (
        <>

          <div className="all-communities">
            <h3>
              {searchQuery || selectedSpecialty ? 'Результаты поиска' : 'Все сообщества'}
            </h3>
            <div className="communities-grid">
              {filteredCommunities.map(community => renderCommunityCard(community))}
            </div>
            {filteredCommunities.length === 0 && (
              <div className="no-results">
                <p>Не найдено сообществ по заданным критериям</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityList;