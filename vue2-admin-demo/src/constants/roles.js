// 角色常量
// 业务代码中统一引用此文件而非写字面字符串，方便全局修改

export const ROLES = {
  SUPER_ADMIN: 'superAdmin',  // 超级管理员 - 所有权限
  ADMIN:       'admin',       // 管理员 - 管理权限
  EDITOR:      'editor',      // 编辑 - 内容管理权限
  VIEWER:      'viewer'       // 查看者 - 只读权限
}

// 角色显示名
export const ROLE_LABEL = {
  [ROLES.SUPER_ADMIN]: '超级管理员',
  [ROLES.ADMIN]:       '管理员',
  [ROLES.EDITOR]:      '编辑',
  [ROLES.VIEWER]:      '查看者'
}

// 角色标签类型（对应 Element UI el-tag type）
export const ROLE_TAG_TYPE = {
  [ROLES.SUPER_ADMIN]: 'danger',
  [ROLES.ADMIN]:       'warning',
  [ROLES.EDITOR]:      'primary',
  [ROLES.VIEWER]:      'info'
}

// 用户状态
export const USER_STATUS = {
  ACTIVE:   1,
  DISABLED: 0
}

export const USER_STATUS_LABEL = {
  [USER_STATUS.ACTIVE]:   '正常',
  [USER_STATUS.DISABLED]: '禁用'
}
