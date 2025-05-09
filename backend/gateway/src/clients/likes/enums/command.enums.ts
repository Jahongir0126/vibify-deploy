export enum LikeCommand {
    LIKE_RETRIEVE_ALL = 'like-service.like.retrieve-all',
    LIKE_RETRIEVE = 'like-service.like.retrieve',
    LIKE_CREATE = 'like-service.like.create',
    LIKE_DELETE = 'like-service.like.delete',
    LIKE_RETRIEVE_BY_USER = 'like-service.like.retrieve-by-user', // Получение всех лайков от конкретного пользователя
    LIKE_CHECK = 'like-service.like.check', // Проверка наличия лайка между пользователями
}