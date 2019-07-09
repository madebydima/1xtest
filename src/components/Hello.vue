<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 text-xs-center>
                <h1>Тестовое задание для 1XBET</h1>
                <div class="subtitle">
                    <p>Сразу несколько моментов.</p>
                    <p>1. Данный вариант сделан "как быстрее". Если делать "как правильно", то необходимо разбить следующую страницу на отдельные компоненты и связать их через Vuex.</p>
                    <p>2. Я не использовал уведомления (например, об ошибках на сервере) для показа сообщений.</p>
                    <p>3. Для форм был выбран Vuetify, но правльнее написать свою библиотеку, чтобы не ставить костыли в местах избыточной функциональности.</p>
                    <p>4. Выполнение задания заняло около 10 часов.</p>
                    <p>5. Не доделана связь "Select All" в выборе колонок с самими колонками в таблице. А также кнопка "Cancel" при удалении продукта.</p>
                </div>
                <router-link :to="{ name: 'Page' }" class="letsgo">Открыть</router-link>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "Hello"
};
</script>

<style scoped lang="scss">
h1 {
    font-size: 40px;
    margin-bottom: 30px;
    
    &::after {
        content: '';
        display: block;
        width: 77px;
        height: 2px;
        background: #4b74ff;
        margin: 10px auto;
    }
}
.subtitle {
    max-width: 636px;
    margin: 0 auto;
    text-align: center;
    p {
        margin-bottom: 12px;
    }
}
.letsgo {
    display: inline-block;
    vertical-align: top;
    border: 2px solid #4b74ff;
    padding: 5px 15px;
    border-radius: 4px;
    color: #4b74ff;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px 0 0;
    text-decoration: none;
    font-weight: 700;
}
</style>
