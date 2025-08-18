// apis/member.js
import api from '@/api/axios'

/** 1) 찜한 매물 리스트 조회 (GET /member/mypage/favorites?page=&size=) */
export const getFavorites = ({ page = 1, size = 10 } = {}) =>
  api.get('/member/mypage/favorites', { params: { page, size } })

/** 2) 찜한 매물 삭제 (DELETE /member/mypage/favorite/delete?buildingId=) */
export const deleteFavorite = (buildingId) =>
  api.delete('/member/mypage/favorite/delete', { params: { buildingId } })

/** 3) 회원정보 수정 페이지 데이터 조회 (POST /member/mypage/edit)
 *  반환: EditMyPage DTO
 */
export const getEditPage = () =>
  api.post('/member/mypage/edit')

/** 4) 비밀번호 변경 (PATCH /member/mypage/edit/password)
 *  payload 예: { currentPassword: '...', newPassword: '...' }  // EditPassword DTO
 */
export const changePassword = (payload) =>
  api.patch('/member/mypage/edit/password', payload)

/** 5) 닉네임 중복 확인 (POST /member/mypage/edit/nickname/check)
 *  body: { nickname }
 *  200: 사용 가능 또는 "현재 닉네임과 동일", 400: 중복
 */
export const checkMyNickname = (nickname) =>
  api.post('/member/mypage/edit/nickname/check', { nickname })

/** 6) 닉네임 변경 (PATCH /member/mypage/edit/nickname)
 *  body: { newNickname }
 *  반환: { nickname: '변경된닉네임' } (EditNicknameResponse)
 */
export const changeNickname = (newNickname) =>
  api.patch('/member/mypage/edit/nickname', { newNickname })

/** 7) 회원 탈퇴 (DELETE /member/mypage/remove)
 *  서버에서 refresh 쿠키 만료 Set-Cookie 내려주므로 withCredentials 필요
 */
export const withdraw = () =>
  api.delete('/member/mypage/remove', { withCredentials: true })

/** 8) 알림 수신 동의 변경 (PATCH /member/mypage/edit/notification/consent)
 *  body: { consent: true|false }
 */
export const updateNotificationConsent = (consent) =>
  api.patch('/member/mypage/edit/notification/consent', { consent })

/** 9) 알림 수신 동의 조회 (GET /member/mypage/notification/consent)
 *  반환: boolean
 */
export const getNotificationConsent = () =>
  api.get('/member/mypage/notification/consent')

// 프로필 이미지 업로드
export const uploadProfileImage = (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  return api.post('/user/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
