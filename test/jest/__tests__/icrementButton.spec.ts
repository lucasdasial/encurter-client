import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, shallowMount } from '@vue/test-utils';
import { QBtn } from 'quasar';
import incrementBtn from 'src/components/Buttons/increment/index';


installQuasarPlugin();

describe('icrement button', () => {
  it('icrement é um método', () => {
    const wrapper = mount(incrementBtn);
    const { vm } = wrapper;

    expect(typeof vm.increment).toBe('function');
  });

  it('verificar o conteúdo interno', () => {
    const wrapper = mount(incrementBtn);
    const { vm } = wrapper;

    expect((vm.$el as HTMLElement).textContent).toContain('rocket muffin');
    expect(wrapper.find('.content').text()).toContain('rocket muffin');
  });

  it('define os dados padrão corretos', () => {
    const wrapper = mount(incrementBtn);
    const { vm } = wrapper;

    expect(typeof vm.counter).toBe('number');
    expect(vm.counter).toBe(0);
  });

  it('atualiza corretamente o contador quando o botão é pressionado', async () => {
    const wrapper = shallowMount(incrementBtn);
    const { vm } = wrapper;
    const button = wrapper.findComponent(QBtn);
    await button.trigger('click');
    expect(vm.counter).toBe(1);
  });
});
