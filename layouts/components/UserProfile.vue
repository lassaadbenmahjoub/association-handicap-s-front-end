<script setup>
import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter()
const userStore = useUserStore()
const { name, role } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.getUser()
  } catch (error) {
    console.log(error)
  }
})

const logout = async () => {
  let res = confirm(t('messages.confirmSignOut')); 
  try {
    if (res) {
      await userStore.logout()
      localStorage.removeItem('token');
      router.push('/login')
      return
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>
            <VListItemTitle>{{ name }}</VListItemTitle>
            <VListItemTitle style="font-weight: bold; color: green;">{{ role }}</VListItemTitle>
          </VListItem>
          <VDivider class="my-2" />
          <router-link to="/account-settings">
            <VListItem>
              <template #prepend>
                <VIcon class="me-2" icon="bx-user" size="22" />
              </template>
              <VListItemTitle>{{ t('menu.profile') }}</VListItemTitle>
            </VListItem>
          </router-link>
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-cog" size="22" />
            </template>
            <VListItemTitle>{{ t('menu.settings') }}</VListItemTitle>
          </VListItem>
          <VDivider class="my-2" />
          <VListItem @click="logout">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>
            <VListItemTitle>{{ t('menu.logout') }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <div class="w-full h-full p-4 m-8 overflow-y-auto">
        <div class="flex items-center justify-center p-40 border-4 border-dotted">
          Profile of: {{ email }}
        </div>
      </div>
    </VAvatar>
  </VBadge>
</template>
