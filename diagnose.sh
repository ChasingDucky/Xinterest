#!/bin/bash

# Xinterest 健康检查和诊断脚本

echo "🔍 Xinterest 服务诊断"
echo "===================="
echo ""

# 检查 Docker 容器状态
echo "📦 检查 Docker 容器..."
docker-compose ps
echo ""

# 检查端口监听
echo "🔌 检查端口..."
echo "前端 (7667):"
lsof -i :7667 2>/dev/null || echo "  ❌ 端口 7667 未监听"
echo "后端 (7666):"
lsof -i :7666 2>/dev/null || echo "  ❌ 端口 7666 未监听"
echo ""

# 测试后端健康
echo "🏥 测试后端健康..."
BACKEND_HEALTH=$(curl -s http://localhost:7666/api/health 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "  ✅ 后端正常: $BACKEND_HEALTH"
else
    echo "  ❌ 后端无法访问"
fi
echo ""

# 测试后端根路由
echo "🌐 测试后端根路由..."
BACKEND_ROOT=$(curl -s http://localhost:7666/ 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "  ✅ 后端根路由: $BACKEND_ROOT"
else
    echo "  ❌ 后端根路由无法访问"
fi
echo ""

# 测试前端
echo "🎨 测试前端..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7667/ 2>/dev/null)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "  ✅ 前端正常 (HTTP $FRONTEND_STATUS)"
else
    echo "  ❌ 前端异常 (HTTP $FRONTEND_STATUS)"
fi
echo ""

# 查看容器日志（最后10行）
echo "📝 容器日志（最后10行）..."
echo ""
echo "--- 后端日志 ---"
docker-compose logs --tail=10 backend 2>/dev/null || echo "无法获取后端日志"
echo ""
echo "--- 前端日志 ---"
docker-compose logs --tail=10 frontend 2>/dev/null || echo "无法获取前端日志"
echo ""

# 建议
echo "💡 诊断建议:"
echo ""
echo "1. 访问前端应用: http://localhost:7667"
echo "2. 访问后端API: http://localhost:7666"
echo "3. 查看完整日志: docker-compose logs -f"
echo "4. 重启服务: make restart"
echo ""

# 常见问题
echo "🔧 常见问题:"
echo ""
if [ "$FRONTEND_STATUS" != "200" ]; then
    echo "❌ 前端无法访问"
    echo "   解决方案: docker-compose restart frontend"
fi

if [ -z "$BACKEND_HEALTH" ]; then
    echo "❌ 后端无法访问"
    echo "   解决方案: docker-compose restart backend"
fi

echo ""
echo "✅ 诊断完成！"
